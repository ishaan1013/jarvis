export const handleDownload = async (id: string) => {
  // returns a .glb 3d object file
  const response = await fetch("/api/model?id=" + id);
  const blob = await response.blob();
  const fileURL = window.URL.createObjectURL(blob);

  return fileURL;
};
