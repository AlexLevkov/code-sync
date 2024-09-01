import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Lesson, RootState } from "../types";
import { Button, Form } from "react-bootstrap";
import CodeEditor from "../components/CodeEditor";
import {
  saveLesson,
  removeLesson,
} from "../app/store/actions/lessons-action.ts";
import { notificationActions } from "../app/store/slices/notifications-slice.ts";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { requireError } from "../utils/noticationContent.ts";
import { AppDispatch } from "../app/store/store";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const lesson = useSelector((state: RootState) =>
    state.lessons.lessonList.find((lesson) => lesson._id === id)
  ) as Lesson;

  const refTitle = useRef<HTMLInputElement>(null);

  const [lessonToEdit, setLessonToEdit] = useState<Lesson>(lesson);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    refTitle.current?.focus();
    if (lesson) {
      setLessonToEdit(lesson);
    } else {
      setLessonToEdit({
        _id: "",
        title: "",
        content: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      });
    }
  }, [lesson]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value: string = event.target.value;
    handleCodeChange(name, value);
  };

  const handleCodeChange = (name: string, value: string) => {
    setLessonToEdit((pv) => {
      if (pv) {
        return { ...pv, [name]: value };
      }
      return { _id: "", title: "", content: "" };
    });
  };

  const submitLesson = async () => {
    if (!lessonToEdit?.title.trim() || !lessonToEdit.content.trim()) {
      dispatch(notificationActions.updateNotification(requireError));
      return;
    }
    const res = await dispatch(saveLesson({ lessonToEdit }));
    if (res) {
      const { _id } = res;
      navigate("/room/" + _id);
    }
  };

  const deleteLesson = (isConfirm: boolean) => {
    setIsDelete(false);
    if (isConfirm && id) {
      dispatch(removeLesson({ id }));
      navigate("/");
    }
  };

  return (
    <div className="edit-page animate__animated animate__fadeIn">
      <h2 className="main-title">{lesson ? "Edit Code" : "New Project"}</h2>
      <DeleteModal
        lessonName={lessonToEdit?.title}
        onDelete={deleteLesson}
        isDelete={isDelete}
      />
      <Form className="main-layout">
        <Form.Control
          ref={refTitle}
          type="text"
          name="title"
          value={lessonToEdit?.title}
          onChange={handleInputChange}
          placeholder="Enter a title for this project"
        />
        <CodeEditor
          content={lessonToEdit?.content}
          onCodeChange={handleCodeChange}
        />

        <div className="btn-box">
          {lessonToEdit?._id && (
            <Button
              variant="danger"
              className="btn-delete"
              onClick={() => {
                setIsDelete(true);
              }}
            >
              Delete
            </Button>
          )}
          <Button variant="dark" className="btn-save" onClick={submitLesson}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditPage;
