import Image from '#models/image';
import type { HttpContext } from '@adonisjs/core/http';

export default class ImagesController {
  async store({ auth, request }: HttpContext) {
    return await Image.fromFs(request.file('image')!.tmpPath!, {
      width: request.input('width') ? Number(request.input('width')) : undefined,
      height: request.input('height') ? Number(request.input('height')) : undefined,
      userId: auth.user?.id,
      fit: request.input('fit'),
      format: request.input('format'),
    });
  }
}
