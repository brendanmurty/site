import { create } from "../vendor/deno-exif/mod.ts";

export function GetExifDataFromPhoto(photoDirectory: string, photoFile: string): Record<string,string|number> {
  // Get the EXIF data from the image
  const parser = create(Deno.readFileSync(photoDirectory + '/' + photoFile));
  const result = parser.parse();

  // Format the data in to human-friendly content assuming photos may not have values for these properties 
  const photoDevice: string = (result.tags.Make && result.tags.Model) ? (result.tags?.Make + ' ' + result.tags?.Model) : '';
  const photoLens: string = (result.tags.LensMake && result.tags.LensModel) ? (result.tags.LensMake + ' ' + result.tags.LensModel) : '';
  const photoFnumber: string = (result.tags.FNumber) ? 'f/' + result.tags.FNumber : '';

  return {
    'direcory': photoDirectory,
    'file': photoFile,
    'device': photoDevice,
    'width': result.imageSize.width,
    'height': result.imageSize.height,
    'lens': photoLens,
    'fnumber': photoFnumber,
  };
}
