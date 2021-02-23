import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API : string = environment.ApiUrl;

/**
 * Classe de Serviço API.
 * O decoratior Injectable usado em classes
 * que não são componentes
 */
@Injectable({ providedIn: 'root' })
export class PhotoService {
    /** 
     * Injeta o objeto HttpClient instanciado no módulo HttpClientModule
     * importado no photo.module @see src\app\photos\photos.module.ts 
     * @property http Propriedade da classe "atalhada" no constructor 
     */
    constructor(
        private http: HttpClient
    ) {}
    
    /**
     * API que busca o array de todas as fotos de "userName"
     * @param userName 
     */
    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`);
    }

    /**
     * API que busca o array das fotos de "userName" na "page"
     * @param userName
     * @param page 
     */
    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`, {params});
    }

    /**
     * API que envia um arquivo de imagem de foto ao servidor
     * @param description 
     * @param allowComments 
     * @param file 
     */
    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        return this.http.post(
            /** url */
            API + '/photos/upload', 
            /** body */
            formData, 
            /** options */
            { observe : 'events', reportProgress: true }
        );
    }

    /**
     * API que pega uma foto específica
     * @param id 
     */
    findById(id: any){
        return this.http
            .get<Photo>(API + '/photos/' + id);
    }

    /**
     * API que pega todos os comentários de uma determinada foto
     * @param photoId 
     */
    getComments(photoId: any) {
        return this.http.get<PhotoComment[]>(API + `/photos/${photoId}/comments`);
    }

    /**
     * API que adiciona um comentário a uma determinada foto
     * @param photoId 
     * @param commentText 
     */
    addComment(photoId: any, commentText: string) {
        return this.http.post(API + `/photos/${photoId}/comments`, {commentText});        
    }

    /**
     * API que remove uma foto
     * @param photoId 
     */
    removePhoto(photoId: any) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    /**
     * API que curte a foto
     * @param photoId 
     */
    like(photoId: any) {
        /**
         * Como existe um código de retorno "304" (not modified), 
         * quando o mesmo usuário curte 2x a mesma foto, devemos
         * direferenciar de outros erros, então, passamos mais um
         * parametro, o objeto observe: 'response', para termos 
         * acesso ao cabeçalho da resposta com esse erro
         */
        return this.http.post(API + '/photos/' + photoId + '/like', {}, { observe: 'response' })
            .pipe(map(res => true)) // deu tudo certo, retorne um observável com booleano "true"
            .pipe(catchError(err => {
                /**
                 * Se o erro for "304", cria um outro observável no lugar, do tipo booleano
                 * com "false", se não, lança o erro repassdo mesmo!
                 */
                return err.status == '304' ? of(false) : throwError(err)
            }));
    }
}