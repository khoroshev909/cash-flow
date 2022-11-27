import httpService from "./http.service";
import {IComment} from "../types/models";

export const commentService = {
    fetchById: async (commentId: string): Promise<IComment> => {
        try {
            const response = await httpService.get<IComment>(`/comments/${commentId}`)
            const {data} = response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }
}