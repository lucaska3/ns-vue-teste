<template lang="pug">
  Page.page
    ActionBar
      GridLayout(width="100%" columns="auto, *")
        Label(text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0")
        Label.title(text="Welcome to NativeScript-Vue!"  col="1")

    RadSideDrawer(ref="drawer")
      StackLayout(~drawerContent backgroundColor="#ffffff")
        Label.drawer-header(text="Drawer")

        Label.drawer-item(text="Item 3")
        Label.drawer-item(text="Item 4")
        Label.drawer-item(text="Item 5")

      GridLayout(~mainContent columns="*" rows="*")
        Label.message( :text="msg" col="0" row="0")
        Button(text="Touch" @tap="touch")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { FingerprintAuth } from "nativescript-fingerprint-auth";

@Component
export default class App extends Vue {
  fingerprintAuth: FingerprintAuth = new FingerprintAuth();

  touch() {
    this.fingerprintAuth
      .verifyFingerprint({
        title: "Android title", // optional title (used only on Android)
        message: "Scan yer finger", // optional (used on both platforms) - for FaceID on iOS see the notes about NSFaceIDUsageDescription
        authenticationValidityDuration: 0, // optional (used on Android, default 5)
        useCustomAndroidUI: false, // set to true to use a different authentication screen (see below)
      })
      .then((enteredPassword) => {
        if (enteredPassword === undefined) {
          console.log("Biometric ID OK");
        } else {
          // compare enteredPassword to the one the user previously configured for your app (which is not the users system password!)
        }
      });
  }

  msg = "Home";
}
</script>

<style scoped lang="scss">
.page {
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .title {
    text-align: left;
    padding-left: 16;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }

  .drawer-header {
    padding: 50 16 16 16;
    margin-bottom: 16;
    background-color: #53ba82;
    color: #ffffff;
    font-size: 24;
  }

  .drawer-item {
    padding: 8 16;
    color: #333333;
    font-size: 16;
  }
}
</style>
