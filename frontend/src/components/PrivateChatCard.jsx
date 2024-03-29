/* eslint-disable react/prop-types */
import { format } from 'date-fns';

import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

import { useMessage } from '../context/MessagesContext';

import { useGroups } from '../context/GroupContext';

const PrivateChatCard = ({ group, panelOpen, setPanelOpen }) => {
  const { setRoom } = useMessage();
  const { user, setSelectedUser, selectedUser } = useUser();
  const { getAllGroups } = useGroups();
  useEffect(() => {
    getAllGroups(user?._id);
  }, [selectedUser]);
  const handleClick = async () => {
    const contact = group?.members?.filter(
      (member) => member._id !== user?._id
    )[0];
    console.log(contact);
    setSelectedUser(contact);
    setRoom(group?.id);
    if (panelOpen) {
      setPanelOpen(false);
    }
  };

  return (
    <>
      <div
        className='flex flex-col flex-wrap w-full rounded-md p-2 my-3 cursor-pointer bg-orange-500'
        onClick={() => handleClick(group?.id)}>
        <div className='flex w-full justify-between items-center p-2'>
          <div className='flex w-full'>
            {group?.members[0]?._id !== user?._id ? (
              <div className='flex  items-center justify-between w-full'>
                <div className='flex items-center justify-start w-full'>
                  <img
                    className='w-6 h-6 rounded-full'
                    src={group?.members[0]?.avatar}
                    alt='avatar'
                  />
                  <p className='font-bold ml-2 text-sm '>
                    {group?.members[0]?.name}
                  </p>
                </div>

                {group.members[0]?.isOnline === 'Online' ? (
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                ) : group.members[0]?.isOnline === 'Busy' ? (
                  <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                ) : (
                  <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                )}
              </div>
            ) : (
              <div className='flex  items-center justify-between w-full '>
                <div className='flex items-center justify-start w-full gap-2'>
                  <img
                    className='w-6 h-6 rounded-full'
                    src={group?.members[1]?.avatar}
                    alt='avatar'
                  />
                  <p className='font-bold text-sm'>{group?.members[1]?.name}</p>
                </div>

                {group.members[1]?.isOnline === 'Online' ? (
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                ) : group.members[1]?.isOnline === 'Busy' ? (
                  <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                ) : (
                  <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                )}
              </div>
            )}
          </div>
        </div>
        {group?.hasLastMessage ? (
          <div className='flex flex-col justify-center w-full'>
            <p className='pl-2 text-xs text-start text-gray-100 mb-1 truncate max-w-[70%]'>
              {group?.lastMessage?.body}
            </p>
            <p className='text-[10px] text-end text-white'>
              {format(
                new Date(group?.lastMessage?.createdAt || Date.now()),
                'p'
              )}
            </p>
          </div>
        ) : (
          <p className='text-xs text-start max-w-[70%] mb-1 text-white truncate'>
            No hay mensajes ...
          </p>
        )}
      </div>
    </>
  );
};

export default PrivateChatCard;
