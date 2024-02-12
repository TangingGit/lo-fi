import { IsNotEmpty } from 'class-validator';

export class UpdateCommentRequest {
    @IsNotEmpty()
    comment_text: string
}