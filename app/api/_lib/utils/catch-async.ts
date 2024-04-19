import { NextRequest, NextResponse } from "next/server";

const catchAsync = (fn: Function) => {
  return (req: NextRequest, res: NextResponse, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
