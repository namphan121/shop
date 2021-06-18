import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { fileModel } from '../model/file.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient, private auth: AuthService) {
    this.userSubject = new BehaviorSubject<fileModel>(
      JSON.parse(localStorage.getItem('file') || 'null')
    );
    this.file = this.userSubject.asObservable();
  }
  private apiFile = 'http://localhost:8080/files';

  private userSubject: BehaviorSubject<fileModel>;
  public file: Observable<fileModel>;

  getList(): Observable<fileModel> {
    return this.http.get<fileModel>(`${this.apiFile}`);
  }
  getBlobThumbnail(id: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.get<Blob>(`${id}`, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  // getImage(id: number): Observable<Blob> {
  //   let uri = this.apiFile + id;

  //   return this.http.get(uri, { responseType: 'blob' });
  // }

  addFile(image: any): Observable<fileModel> {
    const param = new FormData();
    param.append('file', image.file);
    param.append('productId', image.productId);
    return this.http.post<fileModel>(this.apiFile, param);
    ``;
  }
}
