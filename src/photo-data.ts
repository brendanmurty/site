import { create } from "../vendor/deno-exif/mod.ts";

export function GetExifDataFromPhoto(photoDirectory: string, photoFile: string): Record<string,string> {
  const parser = create(Deno.readFileSync(photoDirectory + '/' + photoFile));
  const result = parser.parse();
  const photoDevice: string = (result.tags.Make && result.tags.Model) ? (result.tags?.Make + ' ' + result.tags?.Model) : '';
  const photoDimensions: string = result.imageSize.width + ' x ' + result.imageSize.height;
  const photoLens: string = (result.tags.LensMake && result.tags.LensModel) ? (result.tags.LensMake + ' ' + result.tags.LensModel) : '';
  const photoFnumber: string = (result.tags.FNumber) ? 'f/' + result.tags.FNumber : '';

  return {
    'direcory': photoDirectory,
    'file': photoFile,
    'device': photoDevice,
    'dimensions': photoDimensions,
    'lens': photoLens,
    'fnumber': photoFnumber,
  };
}
