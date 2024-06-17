import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
/* eslint-disable react/prop-types */
const TagsInput = ({ className }) => {
  const [inputState, setInputState] = useState({
    inputFocused: false,
    inputWidth: 20,
    inputValue: "",
  });
  const [tags, setTags] = useState([]);
  const [highLightedTag, setHighlightedTag] = useState(-1);
  const [editingTag, setEditingTag] = useState({
    status: false,
    tagValue: "",
    tagWidth: 20,
  });
  const inputRef = useRef();
  const handleFocus = () => {
    setInputState((prev) => {
      return {
        ...prev,
        inputFocused: true,
      };
    });
    inputRef.current?.focus();
  };
  const handleBlur = () => {
    setInputState((prev) => {
      return {
        ...prev,
        inputFocused: false,
      };
    });
    setHighlightedTag(-1);
  };
  const handleInput = (e) => {
    setHighlightedTag(-1);
    setInputState((prev) => {
      return {
        ...prev,
        inputValue: e.target.value,
        inputWidth: Math.max(20, e.target.value.length * 10),
      };
    });
  };
  const handleRemove = (ind) => {
    setTags((prev) => prev.filter((_, i) => i !== ind));
  };
  useEffect(() => {
    const handleKeys = (e) => {
      if (inputState.inputFocused) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (
            !editingTag.status &&
            inputState.inputValue !== "" &&
            highLightedTag === -1
          ) {
            setTags((prev) => [...prev, inputState.inputValue?.trim()]);
            setInputState((prev) => {
              return {
                ...prev,
                inputValue: "",
                inputWidth: 20,
              };
            });
          } else if (!editingTag.status && highLightedTag !== -1) {
            setEditingTag({
              status: true,
              tagValue: tags[highLightedTag],
              tagWidth: Math.max(20, tags[highLightedTag].length * 10),
            });
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          } else if (editingTag.status) {
            setTags((prev) =>
              prev.map((tag, i) => {
                if (i === highLightedTag) {
                  return editingTag.tagValue?.trim();
                }
                return tag;
              })
            );
            setEditingTag({
              status: false,
              tagValue: "",
              tagWidth: 20,
            });
            setHighlightedTag(-1);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }
        }
        if (!editingTag.status) {
          if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            setHighlightedTag(
              highLightedTag > 0 ? highLightedTag - 1 : tags.length - 1
            );
          }
          if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            setHighlightedTag(
              highLightedTag < tags.length - 1 ? highLightedTag + 1 : 0
            );
          }
          if (
            highLightedTag !== -1 &&
            (e.key === "Delete" || e.key === "Backspace")
          ) {
            e.preventDefault();
            handleRemove(highLightedTag);
            setHighlightedTag(-1);
            inputRef.current?.focus();
          }
        }
      }
    };
    inputRef.current?.addEventListener("keydown", handleKeys);
    return () => {
      inputRef.current?.removeEventListener("keydown", handleKeys);
    };
  }, [inputRef, inputState, highLightedTag, editingTag]);
  return (
    <>
      <div className={`${className}`}>
        <div
          onClick={handleFocus}
          className={`border ${
            inputState.inputFocused ? "border-blue-500" : "border-gray-400"
          } rounded-md py-2 px-3 text-gray-500 text-sm overflow-hidden flex flex-wrap gap-2`}
        >
          {tags.map((tag, tInd) => (
            <span
              key={tInd}
              className={`flex items-center justify-between mr-2 bg-gray-200 py-1 px-2 rounded-md text-gray-600 text-sm ${
                highLightedTag === tInd && "ring-[1px] ring-blue-500"
              }`}
            >
              {(highLightedTag !== tInd ||
                (highLightedTag === tInd && !editingTag.status)) && (
                <span
                  onClick={() => {
                    setHighlightedTag(() => tInd);
                    setEditingTag({
                      status: true,
                      tagValue: tags[highLightedTag],
                      tagWidth: Math.max(20, tags[highLightedTag].length * 10),
                    });
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 0);
                  }}
                >
                  {tag}
                </span>
              )}
              {editingTag.status && highLightedTag === tInd && (
                <input
                  type="text"
                  ref={inputRef}
                  value={editingTag.tagValue}
                  onChange={(e) =>
                    setEditingTag((prev) => {
                      return {
                        ...prev,
                        tagValue: e.target.value,
                        tagWidth: Math.max(20, e.target.value.length * 10),
                      };
                    })
                  }
                  style={{ width: `${editingTag.tagWidth}px` }}
                  className="outline-none bg-gray-200"
                  onBlur={() => {
                    setEditingTag({
                      status: false,
                      tagValue: "",
                      tagWidth: 20,
                    });
                    setHighlightedTag(-1);
                    setInputState((prev) => {
                      return {
                        ...prev,
                        inputFocused: false,
                        inputWidth: 20,
                        inputValue: "",
                      };
                    });
                  }}
                />
              )}
              <span
                onClick={() => handleRemove(tInd)}
                className="pl-1 border-l border-gray-300 ml-1 hover:text-rose-500"
              >
                <IoCloseOutline />
              </span>
            </span>
          ))}
          {!editingTag.status && (
            <input
              type="text"
              ref={inputRef}
              value={inputState.inputValue}
              onChange={handleInput}
              style={{ width: `${inputState.inputWidth}px` }}
              className="outline-none"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TagsInput;
