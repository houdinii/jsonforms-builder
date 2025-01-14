import type {LayoutProps} from "@jsonforms/core";
import {ReactNode} from "react";

export interface ExtendedLayoutProps extends LayoutProps {
  children?: ReactNode;
}