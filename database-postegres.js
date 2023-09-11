import { randomUUID } from "crypto";
import { sql } from "./db.js";
export class DatabasePostegres {
  async list(search) {
    let videos;
    if (videos) {
      videos = await sql`select * from videos where title ilike ${
        "%" + search
      }`;
    } else {
      videos = await sql`select * from videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;
    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(videoId, video) {
    const { title, description, duration } = video;
    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${videoId}`;
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
