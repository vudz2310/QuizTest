
const handleSaveName = () => {
  const nameInput = document.querySelector(".popup-name input") as HTMLInputElement;
  const name = nameInput.value.trim();
  localStorage.setItem("nameUser", name);
};

export function PopupName(){
  return (
    <div className="popup-name">
        <h2>Name </h2>
        <input type="text" placeholder="Nhập Tên của bạn" id="nameInput" />
        <button onClick={handleSaveName}>Lưu</button>

    </div>
  );
};