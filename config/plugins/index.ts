import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';
import configCompression from './compression';

export default function createVitePlugins() {
  const vitePlugins: any[] = [configEslint(), configHtml(), configCompression()];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
