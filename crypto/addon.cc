#include <nan.h>

void Encrypt(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  v8::Local<v8::Context> context = args.GetIsolate()->GetCurrentContext();

  if (!args[0]->IsString()) {
    Nan::ThrowError("First Argument must be a String");
    return;
  } else if (!args[1]->IsString()) {
    Nan::ThrowError("Second Argument must be a String");
    return;
  }
  std::string password = (*Nan::Utf8String(args[0]));
  std::string key = (*Nan::Utf8String(args[1]));

  auto message = Nan::New<v8::String>(password + key).ToLocalChecked();
  args.GetReturnValue().Set(message);
}

void Decrypt(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  v8::Local<v8::Context> context = args.GetIsolate()->GetCurrentContext();

  if (!args[0]->IsString()) {
    Nan::ThrowError("First Argument must be a String");
    return;
  } else if (!args[1]->IsString()) {
    Nan::ThrowError("Second Argument must be a String");
    return;
  }
  std::string password = (*Nan::Utf8String(args[0]));
  std::string key = (*Nan::Utf8String(args[1]));

  auto message = Nan::New<v8::String>(password + key).ToLocalChecked();
  args.GetReturnValue().Set(message);
}

void Initialize(v8::Local<v8::Object> exports) {
  v8::Local<v8::Context> context = exports->CreationContext();
  exports->Set(context, Nan::New("encrypt").ToLocalChecked(),
      Nan::New<v8::FunctionTemplate>(Encrypt)->GetFunction(context).ToLocalChecked());
  exports->Set(context, Nan::New("decrypt").ToLocalChecked(),
      Nan::New<v8::FunctionTemplate>(Decrypt)->GetFunction(context).ToLocalChecked());
}

NODE_MODULE(addon, Initialize)
