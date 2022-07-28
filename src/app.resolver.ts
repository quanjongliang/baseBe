import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Drive } from "@/entity";
import { PubSub } from "graphql-subscriptions";
import { CreateItem } from "./create-item.dto";

const pubSubEvent = {
  newItem: "newItem",
};

@Resolver(() => CreateItem)
export class AppResolver {
  allItem = [];
  private pubSub: PubSub;
  constructor() {
    this.pubSub = new PubSub();
  }

  @Query(() => [CreateItem])
  findAll() {
    return this.allItem;
  }

  @Mutation(() => [CreateItem])
  async createItem(@Args("createItem") createItem: CreateItem) {
    this.pubSub.publish(pubSubEvent.newItem, createItem);
    this.allItem.push(createItem);
    return this.allItem;
  }

  @Subscription(() => CreateItem)
  newItem() {
    this.pubSub.asyncIterator(pubSubEvent.newItem);
  }
}
