export interface IFilter {
  status: StatusFilter,
  colors: IFilterColors
}

export interface IFilterColors extends Array<string>{}

export interface IPayloadChangeColor {
  color: string,
  changeType: ChangeFilterColorAction
}

export interface IActionColorFilterChangeColor {
  color: string,
  changeType: ChangeFilterColorAction
}

export enum ChangeFilterColorAction {
  REMOVE,
  ADDED
}

export enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export const StatusFilterArray: Array<StatusFilter> = [
  StatusFilter.ALL,
  StatusFilter.ACTIVE,
  StatusFilter.COMPLETED
];