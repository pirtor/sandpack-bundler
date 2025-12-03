import { IResolveOptionsInput } from '../resolver';

/**
 * Metadata file for prebuilt dependencies (module name → prebuilt file path mapping)
 * e.g., { "react": "/node_modules/.prebuilt/react.js.wrapper.js" }.
 */
const metaDataFilePath = '/node_modules/.prebuilt/_metadata.json';

export function* tryToResolvePreBuilt(
  opts: IResolveOptionsInput,
  specifier: string
): Generator<any, string | false, any> {
  let resolveId: string | false = false;
  try {
    const contents = yield* opts.readFile(metaDataFilePath);
    const parsed: Record<string, string> = JSON.parse(contents);
    resolveId = parsed[specifier] || false;
  } catch (err) {}
  return resolveId;
}
