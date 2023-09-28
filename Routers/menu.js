import express from "express";
import {
  addMenu,
  getAllMenu,
  deleteAllMenu,
  getMenuById,
  
} from "../Controllers/menu.js";

const router = express.Router();


router.get("/all", async (req, res) => {
  try {
    const menu = await getAllMenu();
    if (menu.length <= 0) {
      res.status(400).send("Menu not found");
      return;
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await getMenuById(id);
    if (!menuItem) {
      res.status(400).send("Menu item not found");
      return;
    }
    res.status(200).json({ data: menuItem });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.post("/add", async (req, res) => {
  try {
    const newMenuItem = req.body;
    if (!newMenuItem) {
      return res.status(400).send({ data: "No menu details provided" });
    }
    const result = await addMenu(newMenuItem);
    res.status(200).send({
      data: { result: result, message: "New menu item added successfully" },
    });
  } catch (error) {
    res.status(500).send({ data: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = req.body;
    if (!id || !updatedMenuItem) {
      return res.status(400).send({ data: "Incomplete data provided" });
    }
    const result = await updateMenu(id, updatedMenuItem);
    res.status(200).json({
      data: { result: result, message: "Menu item updated successfully" },
    });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const result = await deleteAllMenu();
    res
      .status(200)
      .json({ data: { result: result, message: "Menu items deleted" } });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }
});

export const menuRouter = router;
