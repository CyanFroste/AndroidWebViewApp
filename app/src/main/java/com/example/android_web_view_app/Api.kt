package com.example.android_web_view_app

import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class Api(private val ctx: Context, private val webView: WebView) {
    companion object {
        const val NAME = "AndroidInterface"
    }

    @JavascriptInterface
    fun toast(content: String) {
        Toast.makeText(ctx, content, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun exampleAsyncApi(resolve: String, reject: String) {
        CoroutineScope(Dispatchers.Main).launch {
            delay(1000)

            webView.post {
                webView.evaluateJavascript("$resolve({ name: 'javalin' })", null)
            }
        }
    }
}