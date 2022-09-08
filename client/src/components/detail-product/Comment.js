import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Rating, TextField } from "@mui/material";
import { useAlert } from "react-alert";
import moment from "moment";
import "moment/locale/vi";

import { CommentService } from "../../services/comment-service";
import ConfirmDialog from "../common/ConfirmDialog2";

moment.locale("vi");

const Comment = ({values}) => {
  const {call, setCall} = values
  const { user, isLogged, isAdmin } = useSelector((state) => state.auth);
  const params = useParams();
  const [comments, setComments] = useState();
  const [comment, setComment] = useState({
    id_user: user?._id,
    content: "",
    id_product: params.id,
    rating: 5,
    error: "",
  });
  const [rep, setRep] = useState("");
  const [isReply, setIsReply] = useState(false);
  const alert = useAlert();

  const commentService = new CommentService();
  useEffect(() => {
    const getComment = async () => {
      const res = await commentService.getComments(params.id);
      setComments(res.comments);
    };
    getComment();
  }, [call]);

  const handleComment = async () => {
    if (comment.content === "") {
      setComment((comment) => ({
        ...comment,
        error: "Nhập bình luận!",
      }));
      return;
    }
    try {
      await commentService.createComment(comment);
      setCall(!call);
      setComment({
        id_user: user?._id,
        content: "",
        id_product: params.id,
        rating: 5,
        error: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const RepComment = () => {
    setIsReply(true);
  };

  const handleRepComment = async (id_comment) => {
    const createdAt = new Date().toISOString();
    if (!rep) {
      return;
    }
    try {
      await commentService.repComments({
        id_user: user._id,
        content: rep,
        createAt: createdAt,
        id_comment: id_comment,
      });
      setCall(!call); // reset lai comment
      setRep("");
      setIsReply(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await commentService.deleteComment(id);
      if (res.success === true) alert.success("Xóa thành công !");
      setCall(!call);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="review mb-1">
        <h2 className="title-review mb-3">KHÁCH HÀNG NHẬN XÉT</h2>
        {!isLogged && (
          <>
            <p>
              Vui lòng đăng nhập trước khi bình luận! -
              <Link to="/login" className="link-login">
                Đăng nhập
              </Link>
            </p>
          </>
        )}
        {isLogged && (
          <div className="row">
            <div className="col l-3 mb-1">
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                disabled
                value={user?.name}
                label="Họ tên:"
                variant="standard"
              />
            </div>

            <div className="col l-12 mb-1">
              <Rating
                name="rating"
                defaultValue={5}
                onChange={(e) => {
                  setComment((comment) => ({
                    ...comment,
                    rating: +e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col l-12 mb-2">
              <TextField
                sx={{ width: "100%" }}
                label="Đánh giá về sản phẩm *"
                multiline
                value={comment.content}
                onChange={(e) => {
                  setComment((comment) => ({
                    ...comment,
                    content: e.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  if (comment.content === "" && comment.error !== "") {
                    setComment((comment) => ({
                      ...comment,
                      error: "",
                    }));
                  }
                }}
                rows={6}
              />
              <div style={{ color: "red" }}>{comment?.error}</div>
            </div>
            <input type="submit" value="Gửi đánh giá" onClick={handleComment} />
          </div>
        )}
      </div>
      <div className="comment mt-3">
        {comments &&
          comments.map((comment) => (
            <div className="block-comment mb-3" key={comment._id}>
              <div className="comment-main">
                <div className="author">
                  <div className="auth-main">
                    <img src={comment.id_user?.avatar} alt="" />
                    <h5>
                      {comment.id_user?.name}
                      {comment.id_user?.role === 1 && (
                        <span className="qtv">Quản trị viên</span>
                      )}
                    </h5>
                  </div>
                  <div className="delete-action">
                    {/* button delete comment */}
                    {(isAdmin || comment.id_user._id === user._id)&& (
                      <ConfirmDialog
                        values={{
                          title: "Xác nhận xóa!",
                          content: "Bạn có chắc muốn xóa comment này không?",
                          buttonName: "Xóa",
                          handleSubmit: () => handleDeleteComment(comment._id),
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="detail-comment mt-1">
                  <Rating name="read-only" readOnly value={comment.rating} />
                  <div className="content-review">{comment.content}</div>
                  <div className="ulti">
                    <span className="reply" onClick={RepComment}>
                      Trả lời{" "}
                    </span>
                    <span>
                      - <i>{moment(comment?.createdAt).fromNow()}</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="reply-main-block">
                {/* <RepComment reps = {comment.reply} /> */}
                {comment?.reply.map((rep) => (
                  <div key={rep?._id} className="reply-main">
                    <div className="author">
                      <img src={rep.id_user.avatar} alt="" />
                      <h5>
                        {rep?.id_user.name}
                        {rep.id_user.role === 1 && (
                          <span className="qtv">Quản trị viên</span>
                        )}
                      </h5>
                    </div>
                    <div className="detail-comment mt-1">
                      <div className="content-review">{rep.content}</div>
                      <div className="ulti">
                        <span className="reply" onClick={RepComment}>
                          Trả lời{" "}
                        </span>
                        <span>
                          - <i>{moment(rep?.createAt).fromNow()}</i>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isReply && isLogged && (
                <div className="form-reply mt-1">
                  <div className="row">
                    <div className="col l-3 mb-1">
                      <TextField
                        sx={{ width: "100%" }}
                        id="standard-basic"
                        disabled
                        value={user.name}
                        label="Họ tên:"
                        variant="standard"
                      />
                    </div>
                    <div className="col l-12 mb-2">
                      <TextField
                        sx={{ width: "100%" }}
                        name="content"
                        label="Đánh giá về sản phẩm *"
                        value={rep}
                        onChange={(e) => {
                          setRep(e.target.value);
                        }}
                        multiline
                        rows={4}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Gửi đánh giá"
                      onClick={handleRepComment.bind(this, comment._id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Comment;
