/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum EventType {
  LECTURE = "LECTURE",
  EXERCISE = "EXERCISE",
  LECTURE_AND_EXERCISE = "LECTURE_AND_EXERCISE",
  LABS = "LABS",
}

export enum Department {
  COMPUTER_SCIENCE = "COMPUTER_SCIENCE",
  ELECTRICAL_ENGINEERING = "ELECTRICAL_ENGINEERING",
  MECHANICAL_ENGINEERING = "MECHANICAL_ENGINEERING",
}

export enum StudyYear {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  FOURTH = "FOURTH",
  FIFTH = "FIFTH",
}

export interface TimetableDatabase {
  studyPrograms: StudyProgram[];
  classRooms: IdNamePairLong[];
  eventTypes: IdNamePairString[];
  subjects: IdNamePairLong[];
  teachers: IdNamePairLong[];
}

export interface StudyProgram {
  /** @example -54 */
  id: number;
  /** @example "Preddiplomski studij računarstva- 1. godina" */
  name: string;
  studyYear: StudyYear;
  department: Department;
  direction: string | null;
}

export interface IdNamePairLong {
  id: number;
  name: string;
}

export interface IdNamePairString {
  id: string;
  name: string;
}

export interface FsreError {
  /** @example 502 */
  status: number;
  /** @example "Bad Gateway" */
  error: string;
  message: string;
  details?: string;
}

export interface Timetable {
  monday: TimetableEvent[];
  tuesday: TimetableEvent[];
  wednesday: TimetableEvent[];
  thursday: TimetableEvent[];
  friday: TimetableEvent[];
  saturday: TimetableEvent[];
  sunday: TimetableEvent[];
}

export interface TimetableEvent {
  /** Edupage subject ID */
  id: number;
  department: Department | null;
  type: EventType;
  year: StudyYear | null;
  directions: string[] | null;
  name: string;
  /**
   * @format date-time
   * @example "2026-03-09T07:30:00Z"
   */
  startDateTime: string;
  /**
   * @format date-time
   * @example "2026-03-09T09:00:00Z"
   */
  endDateTime: string;
  studyProgramIds: number[];
  classRoomIds: number[];
  teacherIds: number[];
  studyProgramNames: (string | null)[];
  classRoomNames: (string | null)[];
  teacherNames: (string | null)[];
}

export interface MessagingSubscription {
  /** @format uuid */
  id: string;
  channel: MessagingSubscriptionChannelEnum;
  address: string;
  studyProgramId: number;
  timeZone: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  lastNotifiedAt: string | null;
}

export interface MessagingSubscribeDto {
  /**
   * Firebase Cloud Messaging registration token
   * @minLength 1
   */
  fcmToken?: string;
  /** @format email */
  email?: string;
  /** @example -54 */
  studyProgramId: number;
  /**
   * IANA time zone that times in notifications are shown in (default Europe/Sarajevo)
   * @example "Europe/Berlin"
   */
  timeZone?: string;
}

export interface MessagingUnsubscribeDto {
  /**
   * Firebase Cloud Messaging registration token
   * @minLength 1
   */
  fcmToken?: string;
  /** @format email */
  email?: string;
  /** @example -54 */
  studyProgramId: number;
}

export enum MessagingSubscriptionChannelEnum {
  Fcm = "fcm",
  Email = "email",
}

export namespace TimetableDatabase {
  /**
   * No description
   * @name GetTimetableDatabase
   * @summary Get the timetable definitions database for the current study year
   * @request GET:/timetable-database
   * @response `200` `TimetableDatabase` Timetable database retrieved successfully
   * @response `503` `FsreError` The timetable database has not been loaded from Edupage yet
   */
  export namespace GetTimetableDatabase {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TimetableDatabase;
  }
}

export namespace Timetable {
  /**
   * No description
   * @name GetTimetable
   * @summary Get the timetable data for a study program
   * @request GET:/timetable
   * @response `200` `Timetable` Timetable data retrieved successfully
   * @response `400` `FsreError` Invalid study program or ISO week
   * @response `404` `FsreError` Unknown study program
   * @response `502` `FsreError` Edupage request failed
   * @response `503` `FsreError` The timetable database has not been loaded from Edupage yet
   */
  export namespace GetTimetable {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Study program ID; omit to merge all study programs
       * @example -54
       */
      studyProgram?: number | null;
      /**
       * ISO week
       * @example "2024-W09"
       */
      isoWeek: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Timetable;
  }
}

export namespace Messaging {
  /**
   * @description Idempotent: subscribing again updates the time zone and keeps the subscription from being pruned. Clients should resubscribe when their FCM token or time zone changes.
   * @name Subscribe
   * @summary Subscribe an FCM token and/or an email address to timetable changes of a study program
   * @request POST:/messaging/subscribe
   * @response `200` `(MessagingSubscription)[]` Subscribed; one subscription per destination
   * @response `400` `FsreError` Invalid request, unknown study program or an address that cannot receive notifications
   * @response `503` `FsreError` Timetable database not loaded yet, channel disabled or subscription limit reached
   */
  export namespace Subscribe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MessagingSubscribeDto;
    export type RequestHeaders = {};
    export type ResponseBody = MessagingSubscription[];
  }

  /**
   * No description
   * @name Unsubscribe
   * @summary Unsubscribe an FCM token and/or an email address from a study program
   * @request POST:/messaging/unsubscribe
   * @response `200` `void` Successfully unsubscribed (also if there was no such subscription)
   * @response `400` `FsreError` Invalid request
   */
  export namespace Unsubscribe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MessagingUnsubscribeDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<
  D extends unknown,
  E extends unknown = unknown,
> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      key => "undefined" !== typeof query[key]
    );
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async response => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FSRE Timetable Notify API
 * @version 2.0.0
 * @baseUrl /api
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  timetableDatabase = {
    /**
     * No description
     *
     * @name GetTimetableDatabase
     * @summary Get the timetable definitions database for the current study year
     * @request GET:/timetable-database
     * @response `200` `TimetableDatabase` Timetable database retrieved successfully
     * @response `503` `FsreError` The timetable database has not been loaded from Edupage yet
     */
    getTimetableDatabase: (params: RequestParams = {}) =>
      this.request<TimetableDatabase, FsreError>({
        path: `/timetable-database`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  timetable = {
    /**
     * No description
     *
     * @name GetTimetable
     * @summary Get the timetable data for a study program
     * @request GET:/timetable
     * @response `200` `Timetable` Timetable data retrieved successfully
     * @response `400` `FsreError` Invalid study program or ISO week
     * @response `404` `FsreError` Unknown study program
     * @response `502` `FsreError` Edupage request failed
     * @response `503` `FsreError` The timetable database has not been loaded from Edupage yet
     */
    getTimetable: (
      query: {
        /**
         * Study program ID; omit to merge all study programs
         * @example -54
         */
        studyProgram?: number | null;
        /**
         * ISO week
         * @example "2024-W09"
         */
        isoWeek: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<Timetable, FsreError>({
        path: `/timetable`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  messaging = {
    /**
     * @description Idempotent: subscribing again updates the time zone and keeps the subscription from being pruned. Clients should resubscribe when their FCM token or time zone changes.
     *
     * @name Subscribe
     * @summary Subscribe an FCM token and/or an email address to timetable changes of a study program
     * @request POST:/messaging/subscribe
     * @response `200` `(MessagingSubscription)[]` Subscribed; one subscription per destination
     * @response `400` `FsreError` Invalid request, unknown study program or an address that cannot receive notifications
     * @response `503` `FsreError` Timetable database not loaded yet, channel disabled or subscription limit reached
     */
    subscribe: (data: MessagingSubscribeDto, params: RequestParams = {}) =>
      this.request<MessagingSubscription[], FsreError>({
        path: `/messaging/subscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Unsubscribe
     * @summary Unsubscribe an FCM token and/or an email address from a study program
     * @request POST:/messaging/unsubscribe
     * @response `200` `void` Successfully unsubscribed (also if there was no such subscription)
     * @response `400` `FsreError` Invalid request
     */
    unsubscribe: (data: MessagingUnsubscribeDto, params: RequestParams = {}) =>
      this.request<void, FsreError>({
        path: `/messaging/unsubscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
