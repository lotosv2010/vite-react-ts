import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';

export default function configStyleImport() {
  return createStyleImportPlugin({
    resolves: [AntdResolve()],
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => {
          return `antd/es/${name}/style/index`;
        },
      },
    ],
  });
}
