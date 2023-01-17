#include <nan.h>

void Encrypt(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  v8::Local<v8::Context> context = args.GetIsolate()->GetCurrentContext();

  if (!args[0]->IsString()) {
    Nan::ThrowError("First Argument must be a String");
    return;
  }

  std::string password = (*Nan::Utf8String(args[0]));

  int s = 1;
  std::string result = "";
  for (int i = 0; i < password.length(); i++) {
    if (isupper(password[i]))
      result += char(int(password[i] + s - 65) % 26 + 65);
    else
      result += char(int(password[i] + s - 97) % 26 + 97);
  }

  auto message = Nan::New<v8::String>(result).ToLocalChecked();
  args.GetReturnValue().Set(message);
}

void Decrypt(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  v8::Local<v8::Context> context = args.GetIsolate()->GetCurrentContext();

  if (!args[0]->IsString()) {
    Nan::ThrowError("First Argument must be a String");
    return;
  }

  std::string password = (*Nan::Utf8String(args[0]));

  int s = 25;
  std::string result = "";
  for (int i = 0; i < password.length(); i++) {
    if (isupper(password[i]))
      result += char(int(password[i] + s - 65) % 26 + 65);
    else
      result += char(int(password[i] + s - 97) % 26 + 97);
  }

  auto message = Nan::New<v8::String>(result).ToLocalChecked();
  args.GetReturnValue().Set(message);
}

void Initialize(v8::Local<v8::Object> exports) {
  v8::Isolate* isolate = exports->GetIsolate();
  v8::Local<v8::Context>  context = isolate->GetCurrentContext();
  exports->Set(context, Nan::New("encrypt").ToLocalChecked(),
      Nan::New<v8::FunctionTemplate>(Encrypt)->GetFunction(context).ToLocalChecked());
  exports->Set(context, Nan::New("decrypt").ToLocalChecked(),
      Nan::New<v8::FunctionTemplate>(Decrypt)->GetFunction(context).ToLocalChecked());
}

NODE_MODULE(addon, Initialize)
