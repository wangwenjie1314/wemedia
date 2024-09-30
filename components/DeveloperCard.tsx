"use client";

import FollowButton from "@/components/FollowButton";
import wenjie from "@/public/wenjie.jpg";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import Image from "next/image";

export default function DeveloperCard() {
  return (
    <div className="flex w-full items-start justify-center mt-12">
      <Card className="mt-10 w-[400px]">
        <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-indigo-300 via-Cyan-300 to-blue-400">
          <Image className="h-20 w-20 rounded-full overflow-hidden translate-y-12" src={wenjie}  alt="Avatar" />
        </CardHeader>
        <CardBody>
          <div className="pb-4 pt-6">
            <p className="text-large font-medium">Jon</p>
            <p className="max-w-[90%] text-small text-default-400">
              @boomer
            </p>
            <div className="flex gap-2 pb-1 pt-2">
              <Chip variant="flat">👨‍💻前端</Chip>
              <Chip variant="flat">🛠️全栈</Chip>
              <Chip variant="flat">✨自媒体</Chip>
              <Chip variant="flat">⛵️出海</Chip>
            </div>
            <p className="py-2 text-small text-foreground">
              自媒体AI｜出海鼓励师
            </p>
            <div className="w-full text-center mt-4 flex justify-evenly">
              {/* <FollowButton
                name="Twitter/X"
                href="https://twitter.com/weijunext/"
              ></FollowButton> */}
              <FollowButton
                name="Github"
                href="https://github.com/wangwenjie1314"
              ></FollowButton>
              {/* <FollowButton
                name="掘金"
                href="https://juejin.cn/user/26044008768029"
              ></FollowButton> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
