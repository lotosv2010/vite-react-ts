import configEslint from './eslint';
import { VITE_APP_VISUALIZER, VITE_APP_LEGACY } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';
import configCompression from './compression';
import configLegacy from './legacy';
import configMock from './mock';
import configStyleImport from './styleImport';

export default function createVitePlugins(command: string) {
  const vitePlugins: any[] = [
    configEslint(),
    configHtml(),
    configCompression(),
    configMock(command),
    configStyleImport(),
  ];
  VITE_APP_LEGACY && vitePlugins.push(configLegacy());
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
