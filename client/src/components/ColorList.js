import React, { useState } from "react";
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'


const initialColor = {
    color: "",
    code: { hex: "" }
}


const ColorList = ({ colors, updateColors }) => {

    console.log(colors);
    const [editing, setEditing] = useState(false)
    const [adding, setAdding] = useState(false)
    const [colorToEdit, setColorToEdit] = useState(initialColor)
    const [colorToAdd, setColorToAdd] = useState(initialColor)

    const editColor = color => {
        setEditing(true)
        setColorToEdit(color)
    }

    const addColor = () => {
        setAdding(true)
    }

    const saveEdit = e => {
        e.preventDefault();
      
        axiosWithAuth()
            .put(`colors/${colorToEdit.id}`, colorToEdit)
            .then(res => {
                const newColors = [...colors]
                newColors[colors.findIndex(color => color.id === res.data.id)] = res.data
                updateColors(newColors)
                console.log( '[LOG] Axios Response (ColorList->saveEdit): ', res.data )
                setEditing(false)
            })
            .catch((err) => {
                console.log('[LOG] Axios Error (ColorList->saveEdit): ', err)
                setEditing(false)
        })
    }

    const saveColor = e => {
        e.preventDefault();
      
        axiosWithAuth()
            .post('colors', colorToAdd)
            .then(res => {
                updateColors(res.data)
                console.log( '[LOG] Axios Response (ColorList->saveEdit): ', res.data )
                setAdding(false)
            })
            .catch((err) => {
                console.log('[LOG] Axios Error (ColorList->saveEdit): ', err)
                setAdding(false)
        })
    }

    const deleteColor = ({ id }) => {
        console.log('[LOG] (deleteColor->id)', id)
        axiosWithAuth()
            .delete(`colors/${id}`)
            .then(res => {
                updateColors(colors.filter(color => color.id !== res.data));
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <h4>colors &nbsp;<i className="fas fa-plus btn-text-add" onClick={addColor}></i></h4>
            <ul className="colors-wrap">
            {colors.map(color => (
                <li key={color.color} onClick={() => editColor(color)}>
                    <div className="color-box" style={{ backgroundColor: color.code.hex }} />
                    <i className="fas fa-trash-alt btn-text-delete"
                        onClick={e => {
                        e.stopPropagation()
                        deleteColor(color)
                    }}></i>&nbsp;
                    <i className="fas fa-pen btn-text-edit"></i>&nbsp;&nbsp;
                    <span>- {color.color}</span>
                </li>
            ))}
            </ul>
        {editing && (
        <Form onSubmit={saveEdit}>
            <legend>edit color</legend>
            <FormGroup>
                <Label>color name:</Label>
                <Input
                    name="name"
                    id={colorToEdit.id}
                    onChange={e =>
                        setColorToEdit({
                            ...colorToEdit,
                            color: e.target.value
                        })
                    }
                    value={colorToEdit.color}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="">hex code:</Label>
                <Input
                    name="hex"
                    id={colorToEdit.id}
                    onChange={e =>
                        setColorToEdit({
                        ...colorToEdit,
                        code: { hex: e.target.value }
                        })
                    }
                    value={colorToEdit.code.hex}
                />
            </FormGroup>
            <FormGroup>
                <Button color="success" type="submit">save</Button>
                <span>&nbsp;&nbsp;</span>
                <Button color="danger" onClick={() => setEditing(false)}>cancel</Button>
            </FormGroup>
        </Form>
        )}
        {adding && (
        <Form onSubmit={saveColor}>
            <legend>add color</legend>
            <FormGroup>
                <Label>color name:</Label>
                <Input
                    name="name"
                    id={colorToEdit.id}
                    onChange={e =>
                        setColorToAdd({
                            ...setColorToAdd,
                            color: e.target.value
                        })
                    }
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="">hex code:</Label>
                <Input
                    name="hex"
                    id={colorToEdit.id}
                    onChange={e =>
                        setColorToAdd({
                        ...colorToAdd,
                        code: { hex: e.target.value }
                        })
                    }
                />
            </FormGroup>
            <FormGroup>
                <Button color="success" type="submit">save</Button>
                <span>&nbsp;&nbsp;</span>
                <Button color="danger" onClick={() => setAdding(false)}>cancel</Button>
            </FormGroup>
        </Form>
        )}
    </>
    )
}

export default ColorList
