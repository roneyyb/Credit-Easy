package com.awesomeproject;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Context;
import android.graphics.Rect;
import android.os.SystemClock;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.view.WindowMetrics;
import android.widget.ScrollView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import java.util.Random;

public class TouchSimulatorModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private Instrumentation mInstrumentation;
    private Activity activity;
    public TouchSimulatorModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.reactContext = reactContext;
        this.mInstrumentation = new Instrumentation();

    }

    @Override
    public String getName() {
        return "TouchSimulator";
    }



    @ReactMethod
    public void simulateTouch(float x, float y,float statusbarHeight) {
        Log.d("simmulate",y+ " " +x);

        WindowManager windowManager = (WindowManager)  this.reactContext.getSystemService(Context.WINDOW_SERVICE); // Alternative way to get WindowManager
        DisplayMetrics displayMetrics = new DisplayMetrics();
        windowManager.getDefaultDisplay().getMetrics(displayMetrics);
        float width = displayMetrics.widthPixels;
        float height = displayMetrics.heightPixels;

        // Use the screen size information for your purposes
        // For example, logging or adapting your layout
        Log.d("MyActivity", "Screen size: " + width + "x" + height);
         Log.d("MyActivity", x*width + "x" + y*height);

         float totalHeight= statusbarHeight+ y*height;
        Log.d("MyActivity", ""+totalHeight);
        // // Convert x and y to screen coordinates
        // float xRatio = (float) x / 1000; // Assuming x is in the range 0-1000
        // float yRatio = (float) y / 1000; // Assuming y is in the range 0-1000
        // int screenX = (int) (xRatio * screenWidth);
        // int screenY = (int) (yRatio * screenHeight);

        long downTime = SystemClock.uptimeMillis();
        long eventTime = SystemClock.uptimeMillis();

        float offset = 5.0f;
        MotionEvent event = MotionEvent.obtain(
                downTime, eventTime, MotionEvent.ACTION_DOWN, x* width+offset, totalHeight+offset , 0);
        this.mInstrumentation.sendPointerSync(event);

        eventTime = SystemClock.uptimeMillis();
        event = MotionEvent.obtain(
                downTime, eventTime, MotionEvent.ACTION_UP, x* width+offset, totalHeight+offset, 0);
        this.mInstrumentation.sendPointerSync(event);
    }

    @ReactMethod
    public void triggerKeyEvent(int keyCode) {
       long eventTime = SystemClock.uptimeMillis();
        this.mInstrumentation.sendKeyDownUpSync(keyCode);
    }

    // ... rest of your activity code
    @ReactMethod
    public void simulateKeyPress(View view) {
        // Example: Simulate pressing the "ENTER" key
        this.triggerKeyEvent(KeyEvent.KEYCODE_ENTER);
    }

    @ReactMethod
    public void simulateScroll(float deltaY) {
        View view = getCurrentActivity().getWindow().getDecorView();
        if (view instanceof ScrollView) {
            ScrollView scrollView = (ScrollView) view;
            scrollView.smoothScrollBy(0, (int) deltaY);
        }
    }
}