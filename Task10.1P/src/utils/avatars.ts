const col = ['AFD6D7', 'FE9C3B', '92A95C', 'D9A884', '75996C'];

export function getCustomAvatarURL(data: string) {
  const encoded = encodeURI(data);
  return `https://source.boringavatars.com/beam/60/${encoded}?colors=${col.join(
    ',',
  )}`;
}
