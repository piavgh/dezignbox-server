"use strict";

class Observable {
  constructor() {
    this.subscriptions = [];
    this.c_subscriptions = [];
  }

  subscribe(subscriber) {
    let subscription = {
      unsubscribe: () => {
        this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
      },
      onComplete: () => {
      },
      onError: (err) => {
      },
      callback: subscriber
    }
    this.subscriptions.push(subscription);
    return subscription;
  }

  next(data) {
    this.subscriptions.forEach((sub) => {
      sub.callback(data);
    })
  }

  complete() {
    this.subscriptions.forEach((sub) => {
      sub.onComplete();
    });
    this.subscriptions = [];
  }

  error(err) {

    this.subscriptions.forEach((sub) => {
      sub.onError(err);
    });
  }

}

module.exports = Observable;