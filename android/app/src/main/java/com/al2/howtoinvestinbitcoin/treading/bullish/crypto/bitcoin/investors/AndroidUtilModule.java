package com.al2.howtoinvestinbitcoin.treading.bullish.crypto.bitcoin.investors;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.SharedPreferences;
import android.content.Context;

public class AndroidUtilModule extends ReactContextBaseJavaModule {
   ReactApplicationContext context;

   public AndroidUtilModule(ReactApplicationContext reactContext) {
       super(reactContext);
       context = reactContext;
   }

   @Override
   public String getName() {
       return "AndroidUtil";
   }

   @ReactMethod
   public void getDeviceName(Callback cb) {
       try{
           cb.invoke(null, android.os.Build.MODEL);
       }catch (Exception e){
           cb.invoke(e.toString(), null);
       }
   }
   
   @ReactMethod
   public void readString(String name, String defaultValue, Callback cb) {
   		String value = context.getSharedPreferences("data", Context.MODE_PRIVATE).getString(name, defaultValue);
   		cb.invoke(value);
   }
   
   @ReactMethod
   public void readInt(String name, int defaultValue, Callback cb) {
   		int value = context.getSharedPreferences("data", Context.MODE_PRIVATE).getInt(name, defaultValue);
   		cb.invoke(value);
   }
   
   @ReactMethod
   public void readBoolean(String name, boolean defaultValue, Callback cb) {
   		boolean value = context.getSharedPreferences("data", Context.MODE_PRIVATE).getBoolean(name, defaultValue);
   		cb.invoke(value);
   }
   
   @ReactMethod
   public void writeString(String name, String value) {
   		SharedPreferences sp = context.getSharedPreferences("data", Context.MODE_PRIVATE);
   		SharedPreferences.Editor e = sp.edit();
   		e.putString(name, value);
   		e.commit();
   }
   
   @ReactMethod
   public void writeInt(String name, int value) {
   		SharedPreferences sp = context.getSharedPreferences("data", Context.MODE_PRIVATE);
   		SharedPreferences.Editor e = sp.edit();
   		e.putInt(name, value);
   		e.commit();
   }
   
   @ReactMethod
   public void writeBoolean(String name, boolean value) {
   		SharedPreferences sp = context.getSharedPreferences("data", Context.MODE_PRIVATE);
   		SharedPreferences.Editor e = sp.edit();
   		e.putBoolean(name, value);
   		e.commit();
   }
}
