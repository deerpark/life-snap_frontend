export enum PAGENAMES {
  HOME = "/",
  LOGIN = `/login`,
  NOT_FOUND = "/404",
}

export enum KEY {
  ACCESS_TOKEN = "token",
  GTM_ID = "GTM-NX69CBLM",
  GA_ID = "G-43E9PM1PQD",
  SEED = "gs-seed",
}

export enum ERROR_CODE {
  BUSINESS_ERROR = "ERROR",
  NOT_FOUND_PROJECT = "",
  NOT_FOUND_USER = "4001",
  USER_PERMISSIONS = "4030",
  REQUIRED_PARAMETER_HEADER = "4020",
  AUTHORIZED_SERVICE = "4031",
  BINDING_PARAMETER = "4022",
  SERVICE_ERROR = "5000",
  NOT_FOUND_AUTHORIZED = "4033",
  USER_NOT_FOUND_AUTHORIZED = "101",
}

export enum ERROR_MESSAGE {
  SERVER = "서버 오류가 발생했습니다.",
  NETWORK = "서버로부터 응답이 없습니다. 네트워크를 확인하세요.",
  UNKNOWN = "요청을 설정하는 중에 오류가 발생했습니다.",
}

/**
 * 권한을 초기에 셋팅 하려했으나 현재는 무용지물..
 */
export enum USER_ROLE {
  ADMIN = "ADMIN",
  READ = "READ",
  WRITE = "WRITE",
}

export enum IS_ADMIN {
  Y = "Y",
  N = "N",
}

export enum GRADE {
  "WELCOME" = "WELCOME",
  "GOLD" = "GOLD",
  "VIP" = "VIP",
  "VVIP" = "VVIP",
}
