import { createGlobalState } from '@vueuse/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { computed, ref } from 'vue';
import { Notification, Task, TaskCategory, TaskStatus, User, UserBasic } from '../types';
import { emptyUser } from '../helpers/empty';
import { useFirebase } from './useFirebase';
import { nanoid } from 'nanoid';
import { NOTIFICATION_STATUS, TASK_CATEGORY, TASK_STATUS } from '../helpers/constants';

export const useUser = createGlobalState(() => {
  const { updateDoc, getDoc } = useFirebase();

  const userProfile = ref<User>({ ...emptyUser });

  // @ts-ignore
  const userProfileBasic = computed<UserBasic>(() => ({
    id: userProfile.value.id,
    email: userProfile.value.email,
    phone: userProfile.value.phone,
    name: userProfile.value.name,
    points: userProfile.value.points,
    image: userProfile.value.image,
  }));

  // TODO
  const sortedNotifications = computed(() => userProfile.value.notifications);

  const activeNotificationsCount = computed(
    () => userProfile.value.notifications.filter(n => n.status === NOTIFICATION_STATUS.active).length
  );

  const updatePoints = async (userId: string, points: number) => {
    // TODO move to backend
    const userToUpdate = (await getDoc(`users/${userId}`)) as User;

    await updateDoc(`users/${userId}`, {
      points: userToUpdate.points + points,
    });
  };

  const addNotification = async (data: Partial<Notification>, userId = '') => {
    console.log(userId);
    console.log(`users/${userId ? userId : userProfile.value.id}`);
    await updateDoc(`users/${userId ? userId : userProfile.value.id}`, {
      notifications: firebase.firestore.FieldValue.arrayUnion(
        ...[
          {
            id: nanoid(),
            ...data,
            status: NOTIFICATION_STATUS.active,
          },
        ]
      ),
    });

    console.log('afterAwait');
  };

  // TODO create update notification function

  const addTask = async (
    { name, description, points, expirationDate, finishDate, category }: Partial<Task>,
    userId = ''
  ) => {
    await updateDoc(`users/${userId ? userId : userProfile.value.id}`, {
      tasks: firebase.firestore.FieldValue.arrayUnion(
        ...[
          {
            id: nanoid(),
            name,
            description,
            points,
            expirationDate,
            finishDate,
            category,
            status: TASK_STATUS.active,
          },
        ]
      ),
    });
  };

  // TODO create update function task

  return {
    userProfile,
    userProfileBasic,
    updatePoints,
    activeNotificationsCount,
    sortedNotifications,
    addNotification,
    addTask,
  };
});
