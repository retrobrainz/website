import Image from '#models/image';
import { imageStoreValidator } from '#validators/image_validator';
import type { HttpContext } from '@adonisjs/core/http';

export default class ImagesController {
  async store({ auth, request }: HttpContext) {
    const { image, width, height, fit } = await imageStoreValidator.validate(request);
    return await Image.fromFs(image.tmpPath!, {
      width,
      height,
      userId: auth.user?.id,
      fit,
    });
  }
}
