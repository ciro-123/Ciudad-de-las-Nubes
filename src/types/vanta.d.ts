declare module 'vanta/dist/vanta.clouds.min' {
  const CLOUDS: (options: Record<string, unknown>) => {
    destroy: () => void;
    setOptions: (options: Record<string, unknown>) => void;
  };
  export default CLOUDS;
}
