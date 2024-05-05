"use server";

import { auth } from "@/auth";

const userSession = async () => await auth();

export default userSession;
