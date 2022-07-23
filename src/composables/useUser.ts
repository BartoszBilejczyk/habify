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
    nickname: userProfile.value.nickname,
    points: userProfile.value.points,
    image: userProfile.value.image,
  }));

  // TODO
  const sortedNotifications = computed(() => userProfile.value.notifications);

  const visibleNotifications = computed(() =>
    userProfile.value.notifications.filter(n => n.status !== NOTIFICATION_STATUS.dismissed)
  );

  const activeNotificationsLength = computed(
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
  };

  const markNotificationAsDimissed = async (id: string) => {
    const challengeIndex = userProfile.value.notifications.findIndex(notif => notif.id === id);
    const notificationToUpdate = userProfile.value.notifications.find(notif => notif.id === id);

    const updatedNotifications = [
      ...userProfile.value.notifications.slice(0, challengeIndex),
      {
        ...notificationToUpdate,
        status: NOTIFICATION_STATUS.dismissed,
      },
      ...userProfile.value.notifications.slice(challengeIndex + 1),
    ];

    console.log(updatedNotifications);

    await updateDoc(`users/${userProfile.value.id}`, {
      notifications: updatedNotifications,
    });
  };

  const markNotificationsAsSeen = async () => {
    await updateDoc(`users/${userProfile.value.id}`, {
      notifications: userProfile.value.notifications.map(n => ({
        ...n,
        status: n.status !== NOTIFICATION_STATUS.dismissed ? NOTIFICATION_STATUS.seen : NOTIFICATION_STATUS.dismissed,
      })),
    });
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
    visibleNotifications,
    sortedNotifications,
    markNotificationAsDimissed,
    markNotificationsAsSeen,
    addNotification,
    addTask,
    activeNotificationsLength,
  };
});
