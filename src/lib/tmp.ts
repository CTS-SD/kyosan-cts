import { signUp } from "./auth-client";

async function main() {
  await signUp.email({
    name: "京産キャンスタメンバー",
    email: "cts-member@example.com",
    password: "kyosan5477",
  })
}

main();
