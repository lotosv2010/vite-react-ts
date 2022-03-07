import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';

export default function createVitePlugins() {
  const vitePlugins: any[] = [configEslint()];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
