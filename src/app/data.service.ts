import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as serverConfig from '../config/server.config.json';
import * as restUrls from '../config/rest.config.json';

@Injectable()
export class DataService {

  serverConfig: any = serverConfig;
  restUrls: any = restUrls;
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = this.buildBaseUrl();
  }

  getRestUrls(): any {
    return this.restUrls;
  }

  buildBaseUrl(): string {
    let baseUrl;
    if (this.serverConfig) {
      if (this.serverConfig.sslEnabled) {
        baseUrl = 'https://'
      } else {
        baseUrl = 'http://'
      }
      if (this.serverConfig.domain) {
        baseUrl += this.serverConfig.domain;
        if (this.serverConfig.port) {
          baseUrl += ':' + this.serverConfig.port;
        }
        baseUrl += '/';
      }
      if (this.serverConfig.appContext) {
        baseUrl += this.serverConfig.appContext + '/'
      }
      if (this.serverConfig.restContext) {
        baseUrl += this.serverConfig.restContext + '/'
      }
    }
    return baseUrl;
  }

  buildUrl(url: string, urlParams?: string | number[], searchParams?: any): string {
    if (urlParams) {
      for(let i = 0; i < urlParams.length; i++) {
        url += '/' + urlParams[i];
      }
    }
    if (searchParams) {
      url += '?'
      for (let key in searchParams) {
        url += key + '=' + searchParams[key] + '&'
      }
      if (url.lastIndexOf('&') == url.length - 1) {
        url = url.substr(0, url.length -  1);
      }
    }
    return this.baseUrl + url;
  }

  postData(url: string, data: any): Observable<any> {
    return this.httpClient.post<any>(this.buildUrl(url), data);
  }

  getData(url: string, urlParams?: string | number[], searchParams?: {}): Observable<any> {
    return this.httpClient.get<any>(this.buildUrl(url, urlParams, searchParams));
  }

  putData(url: string, data: any, urlParams?: string | number[], searchParams?: {}): Observable<any> {
    return this.httpClient.put<any>(this.buildUrl(url, urlParams, searchParams), data);
  }

  deleteData(url: string, urlParams?: string | number[], searchParams?: {}): Observable<any> {
    return this.httpClient.delete<any>(this.buildUrl(url, urlParams, searchParams));
  }

}
