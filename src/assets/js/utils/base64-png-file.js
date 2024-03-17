/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2024-03-15 20:33:29
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-15 20:40:48
 * @FilePath: \collegeApplication\src\assets\js\utils\base64-png-file.js
 * @Description: 将base64文件转为pngfile文件
 */
export function base64ToPNGFile(base64ImageString) {
  try {
      const fileName = generateRandomFileName();
      
      // 检查 base64ImageString 是否以逗号分隔的格式开头（例如 'data:image/png;base64,'）
      if (!base64ImageString.startsWith('data:image/png;base64,')) {
          throw new Error('Invalid base64 format');
      }

      const base64String = base64ImageString.replace('data:image/png;base64,', '');
      
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/png' });

      return new File([blob], fileName, { type: 'image/png' });
  } catch (error) {
      console.error('Error converting base64 to PNG file:', error);
      return null;
  }
}

function generateRandomFileName() {
  const randomString = Math.random().toString(36).substring(7);
  return `image_${randomString}.png`;
}

