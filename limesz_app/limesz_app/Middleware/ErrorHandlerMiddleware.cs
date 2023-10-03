﻿using System;
using System.Net;
using System.Text.Json;
using System.Web.Http;

namespace margarita_app.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch (error)
                {
                    case NotImplementedException e:
                        // custom application error
                        response.StatusCode = (int)HttpStatusCode.NotImplemented;
                        break;
                    case HttpResponseException e:
                        // not found error
                        response.StatusCode = (int)e.Response.StatusCode;
                        break;
                    default:
                        // unhandled error
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var result = JsonSerializer.Serialize(new { message = error?.Message });
                await response.WriteAsync(result);
            }
        }
    }
}

