export interface DashJsPlayer {
  initialize: (element: HTMLVideoElement, url: string, autoPlay: boolean) => void;
  reset: () => void;
  updateSettings: (settings: any) => void;
  // Add other dash.js methods you need
}