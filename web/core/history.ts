/**
 * @copyright 2016-present Kriasoft (https://git.io/Jt7GM)
 */

import * as React from "react";
import { Action } from "history";
import type {
  History as HistoryBase,
  Location as LocationBase,
  State,
} from "history";

export type History = HistoryBase<State>;
export type Location = LocationBase<State>;

// Provide the default history object (for unit testing)
export const HistoryContext = React.createContext<History>({
  action: Action.Pop,
  location: { key: "", pathname: "/", search: "" },
} as History);

// Provide the default location object (for unit testing)
export const LocationContext = React.createContext<Location>({
  key: "",
  pathname: "/",
  search: "",
} as Location);
