import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }
url:string="https://localhost:7053/api/User"


  getLogin(email:string ,password:string):Observable<any>{
    return this.http.get(this.url+'/'+email+'/'+password)
  }
  getUsers():Observable<any>
  {
    return this.http.get(this.url);
  }
  getUser(id:any):Observable<any>
  {
    return this.http.get(this.url+'/'+id);
  }
  createUser(users:FormData):Observable<any>
  {
    return this.http.post(this.url,users)
  }
  updateUser(id:any,users:FormData):Observable<any>{
    return this.http.put(this.url+'/'+id,users)
  }
  deleteUser(id:any):Observable<any>
  {
return this.http.delete(this.url+'/'+id)
  }

  // Activate user
  activateUser(userId: number): Observable<any> {
    return this.http.put(`${this.url}/${userId}/activate`, {});
  }

  // Deactivate user
  deactivateUser(userId: number): Observable<any> {
    return this.http.put(`${this.url}/${userId}/deactivate`, {});
  }


  
 apiurl:string="https://localhost:7053/api/Product"

 getProducts():Observable<any>
 {
  return this.http.get(this.apiurl)
 }
//  getProduct(id:any):Observable<any>
//  {
//    return this.http.get(this.apiurl+'/'+id);
//  }
//  createProduct(users: FormData): Observable<any> {
//   return this.http.post(this.apiurl, users);  // No need for headers
// }

//  updateProduct(id:any,users:FormData):Observable<any>{
//    return this.http.put(this.apiurl+'/'+id,users)
//  }
 deleteProduct(id:number):Observable<any>
 {
return this.http.delete(this.apiurl+'/'+id)
 }
 createProduct(formData: FormData): Observable<any> {
  return this.http.post(this.apiurl, formData);
}

// ✅ Update Product (PUT)
updateProduct(id: number, formData: FormData): Observable<any> {
  return this.http.put(`${this.apiurl}/${id}`, formData);
}

// ✅ Get a single product by ID
getProduct(id: string): Observable<any> {
  return this.http.get(`${this.apiurl}/${id}`);
}


// Method to get product by ID
getProductById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiurl}/${id}`);
}

//  updateProduct(id: number, formData: FormData) {
//   return this.http.put(`http://localhost:5000/api/Product/${id}`, formData, {
//     headers: { 'Accept': 'application/json' }
//   });
// }


roleapi:string="https://localhost:7053/api/RoleContoller"
getRoles():Observable<any>
{
  return this.http.get(this.roleapi);
}
createRole(roles: any):Observable<any>
{
  return this.http.post(this.roleapi,roles)
}
deleteRole(id:any):Observable<any>{
return this.http.delete(this.roleapi+'/'+id)
}

}
