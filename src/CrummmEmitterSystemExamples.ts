import { CrummmEmitterSystemInstance } from "./CrummmEmitterSystemInstance";
import { CrummmEmitterSystem } from "./CrummmEmitterSystem";

export class CrummmEmitterSystemExamples {
  constructor(){}

  public instanceExampleWithEmitAndOn() {
    const TYPE = "TYPE";
    const emitter = new CrummmEmitterSystemInstance();

    emitter.on(TYPE, (payload) => {
      console.log("This should fire both times: ", payload.message);
    });

    setTimeout(
      () => {
        emitter.emit(TYPE, { message: "Hello World 1!" });
        emitter.emit(TYPE, { message: "Hello World 2!" });
      },
      1000
    );

    // EXPECTED RESULT LOG
    // This should fire both times:  Hello World 1!
    // This should fire both times:  Hello World 2!
  }

  public instanceExampleWithEmitAndOnOnce() {
    const TYPE = "TYPE";
    const emitter = new CrummmEmitterSystemInstance();

    emitter.onOnce(TYPE, (payload) => {
      console.log("This should fire once: ", payload.message);
    });

    setTimeout(
      () => {
        emitter.emit(TYPE, { message: "Hello World 1!" });
        emitter.emit(TYPE, { message: "Hello World 2!" });
      },
      1000
    );

    // EXPECTED RESULT LOG
    // This should fire once:  Hello World 1!
  }

  public instanceExampleWithListenOrder() {
    const TYPE = "TYPE";
    const emitter = new CrummmEmitterSystemInstance();

    emitter.onOnce(
      TYPE,
      (payload) => {
        console.log("This should fire 3rd even though it's setup 1st: ", payload.message);
      },
      5
    );

    emitter.onOnce(
      TYPE,
      (payload) => {
        console.log("This should fire 1st even though it's setup 2nd: ", payload.message);
      },
      1
    );

    emitter.onOnce(
      TYPE,
      (payload) => {
        console.log("This should fire 2nd even though it's setup 3rd: ", payload.message);
      },
      2
    );

    setTimeout(
      () => {
        emitter.emit(TYPE, { message: "Hello listenOrder!" });
      },
      1000
    );

    // EXPECTED RESULT LOG
    // This should fire 1st even though it's setup 2nd:  Hello listenOrder!
    // This should fire 2nd even though it's setup 3rd:  Hello listenOrder!
    // This should fire 3rd even though it's setup 1st:  Hello listenOrder!
  }

  public systemExampleWithRequestAndResponse() {
    // listen for requests
    CrummmEmitterSystem.onRequest(
      "helloRequest",
      (responseCallback: Function, requestValue: any)=> {
        responseCallback("Hello " + requestValue + "!");
      }
    );

    // make request for data
    CrummmEmitterSystem.emitRequest(
      "helloRequest",
      (response: string)=> {
        console.log(response);
      },
      "Billy"
    );

    // EXPECTED RESULT LOG
    // Hello Billy!
  }
}
