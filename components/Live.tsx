import React, { useCallback, useEffect, useState } from "react";
import LiveCursors from "./Cursors/LiveCursors";
import { useOthers, useMyPresence } from "@/liveblocks.config";
import CursorChat from "./Cursors/CursorChat";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import ReactionSelector from "./reaction/ReactionButton";

const Live = () => {
    const others = useOthers();
    
    console.log(others);
    
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const [reaction, setReaction] = useState<Reaction[]>([]);
    
  

      // Listen to keyboard events to change the cursor state
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } 

      else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } 

      else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }

    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);


    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
        
        // // if cursor is not in reaction selector mode, update the cursor position
        if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
            // get the cursor position in the canvas
            const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
            const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
            
            // broadcast the cursor position to other users
            updateMyPresence({
                cursor: {
                    x,
                    y,
                },
            });
        }
            // console.log("Triggering Move")
            // console.log(`x is ${x} | y is ${y}`)
      }, []);

// Hide the cursor when the mouse leaves the canvas
const handlePointerLeave = useCallback(() => {
    setCursorState({
      mode: CursorMode.Hidden,
    });
    updateMyPresence({
      cursor: null,
      message: null,
    });

    console.log("Triggering Leave")
}, []);

// Show the cursor when the mouse enters the canvas
const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
        // get the cursor position in the canvas
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
        
        updateMyPresence({
            cursor: {
                x,
                y,
            },
        });

        setCursorState((state : CursorState)=>
        cursorState.mode === CursorMode.Reaction ? 
        {...state, isPressed:true} : state
        )
        
        console.log("Triggering Down")
    },
    [cursorState.mode, setCursorState]
  );

  
// hide the cursor when the mouse is up
  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: false } : state
    );
  }, [cursorState.mode, setCursorState]);



  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      className="h-[100vh] w-full flex justify-center items-center text-center border-2 border-green-500"
    >
      <h1 className="text-5xl text-white">Hi There</h1>

          {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}
        {cursorState.mode == CursorMode.ReactionSelector 
        && (
            <ReactionSelector
            setReaction={(reaction)=>{
            setReaction(reaction);
            }}
            />
        )
        }

          <LiveCursors others={others} />
    
    </div>
  );
};

export default Live;
