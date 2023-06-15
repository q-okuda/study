import type { MicroCMSListContent } from "microcms-js-sdk";

export type Tag = {
    name: string;
} & MicroCMSListContent;

export type Blog = {
    title: string;
    content: string;
    eyecatch: object;
    tag: Tag[];
} & MicroCMSListContent;