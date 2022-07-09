import { OnClickOutside } from '@vueuse/components';

import { usePermission } from '@vueuse/core';
const microphoneAccess = usePermission('microphone');

import { useFileSystemAccess } from '@vueuse/core';
const {
  isSupported,
  data,
  file,
  fileName,
  fileMIME,
  fileSize,
  fileLastModified,
  create,
  open,
  save,
  saveAs,
  updateData,
} = useFileSystemAccess();

import { useTimeAgo } from '@vueuse/core';

const timeAgo = useTimeAgo(new Date(2021, 0, 1));

// <UseTimeAgo v-slot="{ timeAgo }" :time="new Date(2021, 0, 1)">
//   Time Ago: {{ timeAgo }}
// </UseTimeAgo>

// npm install jwt-decode

import { useJwt } from '@vueuse/integrations/useJwt';

// setup() {
//   const encodedJwt = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc')
//   const { header, payload } = useJwt(encodedJwt)
//
//   return { header, payload }
// },
